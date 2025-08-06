import { useState } from "react";
import Header from "@/components/Header";
import InventoryForm from "@/components/InventoryForm";
import { TrendingUp, Database, Shield, Zap, CheckCircle, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HederaResponse } from "@/services/inventoryService";

const Index = () => {
  const [latestTransactions, setLatestTransactions] = useState<HederaResponse[]>([]);
  const { toast } = useToast();

  const handleTransactionComplete = (response: HederaResponse) => {
    setLatestTransactions(prev => [response, ...prev.slice(0, 99)]); // Keep latest 100
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const features = [
    {
      icon: Database,
      title: "Immutable Records",
      description: "Every inventory item is permanently recorded on Hedera's distributed ledger"
    },
    {
      icon: TrendingUp,
      title: "AI Insights",
      description: "Get intelligent analytics and predictions about your inventory patterns"
    },
    {
      icon: Shield,
      title: "Consensus Security",
      description: "Hedera Consensus Service ensures data integrity and trust"
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Automated workflows keep all systems synchronized instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Professional Inventory Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage the power of Hedera's distributed ledger technology combined with AI-driven insights 
            for transparent, immutable inventory tracking.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Inventory Form */}
          <div className="flex justify-center animate-slide-in">
            <InventoryForm onTransactionComplete={handleTransactionComplete} />
          </div>
          
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 animate-slide-in">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="bg-gradient-card border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Latest Transactions List */}
        {latestTransactions.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <Card className="bg-gradient-card border border-success/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <CardTitle className="text-success">Latest Transactions ({latestTransactions.length})</CardTitle>
                </div>
                <CardDescription>
                  Recent inventory items logged to Hedera HCS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {latestTransactions.map((transaction, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">
                          {transaction.itemName || 'Inventory Item'} {transaction.sku && `- SKU: ${transaction.sku}`}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${transaction.success ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                            {transaction.success ? '✓ Success' : '✗ Failed'}
                          </span>
                          <span className="text-xs text-muted-foreground">#{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        {transaction.tokenId && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Token ID:</span>
                            <span className="font-mono text-primary">{transaction.tokenId}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Transaction ID:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-primary text-xs">{transaction.transactionId}</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => copyToClipboard(transaction.transactionId, "Transaction ID")}
                              className="h-4 w-4 p-0"
                            >
                              <Copy className="h-2 w-2" />
                            </Button>
                          </div>
                        </div>
                        
                        {transaction.message && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Message:</span>
                            <span className="text-success">{transaction.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Status */}
        <div className="bg-gradient-card rounded-xl p-6 shadow-lg border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            System Architecture
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Inventory UI</span>
              <span className="text-muted-foreground">:3000</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Agent Kit AI</span>
              <span className="text-muted-foreground">:3001</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Blockchain UI</span>
              <span className="text-muted-foreground">:3002</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span>n8n Backend</span>
              <span className="text-muted-foreground">:5678</span>
            </div>
          </div>
          
          {latestTransactions && latestTransactions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-success">
                <CheckCircle className="h-4 w-4" />
                <span>Last Transaction: {latestTransactions[0]?.itemName || 'Unnamed'} → Topic {latestTransactions[0]?.topicId?.slice(-8) || 'N/A'}</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
