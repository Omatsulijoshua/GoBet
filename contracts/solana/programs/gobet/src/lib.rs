use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod gobet {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let global_state = &mut ctx.accounts.global_state;
        global_state.admin = *ctx.accounts.admin.key;
        global_state.total_bets = 0;
        Ok(())
    }

    pub fn place_bet(
        ctx: Context<PlaceBet>, 
        amount: u64, 
        match_id: String, 
        selected_outcome: String,
        potential_payout: u64
    ) -> Result<()> {
        let bet = &mut ctx.accounts.bet;
        let user = &mut ctx.accounts.user;

        // Transfer SOL from user to escrow vault
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &user.key(),
            &ctx.accounts.escrow_vault.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                user.to_account_info(),
                ctx.accounts.escrow_vault.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        bet.bettor = *user.key;
        bet.amount = amount;
        bet.match_id = match_id;
        bet.selected_outcome = selected_outcome;
        bet.potential_payout = potential_payout;
        bet.is_resolved = false;
        bet.is_winner = false;

        let global_state = &mut ctx.accounts.global_state;
        global_state.total_bets += 1;

        Ok(())
    }

    pub fn resolve_bet(ctx: Context<ResolveBet>, is_winner: bool) -> Result<()> {
        let bet = &mut ctx.accounts.bet;
        require!(!bet.is_resolved, CustomError::AlreadyResolved);

        bet.is_resolved = true;
        bet.is_winner = is_winner;

        if is_winner {
            // Transfer winnings from escrow vault to user
            let amount = bet.potential_payout;
            
            **ctx.accounts.escrow_vault.to_account_info().try_borrow_mut_lamports()? -= amount;
            **ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? += amount;
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 8)]
    pub global_state: Account<'info, GlobalState>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8 + 64 + 64 + 8 + 1 + 1)]
    pub bet: Account<'info, BetState>,
    #[account(mut)]
    pub global_state: Account<'info, GlobalState>,
    /// CHECK: Escrow vault for storing bets
    #[account(mut)]
    pub escrow_vault: AccountInfo<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolveBet<'info> {
    #[account(mut)]
    pub bet: Account<'info, BetState>,
    #[account(mut, has_one = admin)]
    pub global_state: Account<'info, GlobalState>,
    /// CHECK: Escrow vault
    #[account(mut)]
    pub escrow_vault: AccountInfo<'info>,
    /// CHECK: The user who placed the bet
    #[account(mut, address = bet.bettor)]
    pub user: AccountInfo<'info>,
    pub admin: Signer<'info>,
}

#[account]
pub struct GlobalState {
    pub admin: Pubkey,
    pub total_bets: u64,
}

#[account]
pub struct BetState {
    pub bettor: Pubkey,
    pub amount: u64,
    pub match_id: String,
    pub selected_outcome: String,
    pub potential_payout: u64,
    pub is_resolved: bool,
    pub is_winner: bool,
}

#[error_code]
pub enum CustomError {
    #[msg("Bet is already resolved")]
    AlreadyResolved,
}
