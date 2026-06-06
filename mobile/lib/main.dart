import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:walletconnect_flutter_v2/walletconnect_flutter_v2.dart';
import 'package:device_preview/device_preview.dart';

void main() {
  runApp(
    DevicePreview(
      enabled: !kReleaseMode,
      builder: (context) => const GoBetApp(),
    ),
  );
}

class GoBetApp extends StatelessWidget {
  const GoBetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GoBet',
      useInheritedMediaQuery: true,
      locale: DevicePreview.locale(context),
      builder: DevicePreview.appBuilder,
      theme: ThemeData(
        colorScheme: const ColorScheme.dark(
          primary: Colors.indigo,
          secondary: Colors.purple, // gray-950
          surface: Color(0xFF1F2937), // gray-900
        ),
        useMaterial3: true,
      ),
      home: const WalletConnectScreen(),
    );
  }
}

class WalletConnectScreen extends StatefulWidget {
  const WalletConnectScreen({super.key});

  @override
  State<WalletConnectScreen> createState() => _WalletConnectScreenState();
}

class _WalletConnectScreenState extends State<WalletConnectScreen> {
  Web3App? _web3app;
  String _statusText = 'Not Connected';

  @override
  void initState() {
    super.initState();
    _initializeWalletConnect();
  }

  Future<void> _initializeWalletConnect() async {
    _web3app = await Web3App.createInstance(
      projectId: 'your_walletconnect_project_id', // Replace with real ID
      metadata: const PairingMetadata(
        name: 'GoBet',
        description: 'Decentralized Betting Platform',
        url: 'https://gobet.app',
        icons: ['https://gobet.app/logo.png'],
      ),
    );
  }

  Future<void> _connectMetaMask() async {
    if (_web3app == null) return;

    try {
      ConnectResponse resp = await _web3app!.connect(
        requiredNamespaces: {
          'eip155': const RequiredNamespace(
            chains: ['eip155:1'], // Ethereum Mainnet
            methods: ['eth_sendTransaction', 'personal_sign'],
            events: ['chainChanged', 'accountsChanged'],
          ),
        },
      );

      final uri = resp.uri;
      if (uri != null) {
        // Deep link into MetaMask
        final metamaskUri = Uri.parse(
          'metamask://wc?uri=${Uri.encodeComponent(uri.toString())}',
        );
        if (await canLaunchUrl(metamaskUri)) {
          await launchUrl(metamaskUri, mode: LaunchMode.externalApplication);
        } else {
          setState(() {
            _statusText = 'Could not launch MetaMask. Is it installed?';
          });
        }
      }

      final session = await resp.session.future;
      setState(() {
        _statusText =
            'Connected to MetaMask: ${session.namespaces['eip155']?.accounts.first}';
      });
    } catch (e) {
      setState(() {
        _statusText = 'MetaMask Error: $e';
      });
    }
  }

  Future<void> _connectPhantom() async {
    // Basic Phantom deep link integration for Solana
    final phantomUri = Uri.parse('phantom://browse/https://gobet.app');

    try {
      if (await canLaunchUrl(phantomUri)) {
        await launchUrl(phantomUri, mode: LaunchMode.externalApplication);
        setState(() {
          _statusText =
              'Opened Phantom Wallet. Please connect within the browser.';
        });
      } else {
        setState(() {
          _statusText = 'Could not launch Phantom. Is it installed?';
        });
      }
    } catch (e) {
      setState(() {
        _statusText = 'Phantom Error: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Colors.indigo, Colors.purple],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Center(
                  child: Text(
                    'G',
                    style: TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),
              const Text(
                'Connect Wallet',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 48),

              // MetaMask Button
              ElevatedButton(
                onPressed: _connectMetaMask,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.black,
                  minimumSize: const Size(double.infinity, 56),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.account_balance_wallet, color: Colors.orange),
                    SizedBox(width: 12),
                    Text(
                      'Connect MetaMask',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Phantom Button
              ElevatedButton(
                onPressed: _connectPhantom,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFAB9FF2), // Phantom purple
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 56),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.account_balance_wallet, color: Colors.white),
                    SizedBox(width: 12),
                    Text(
                      'Connect Phantom',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),
              Text(
                _statusText,
                style: const TextStyle(color: Colors.grey),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
