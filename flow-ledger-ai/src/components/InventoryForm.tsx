import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InventoryService, InventoryItem, HederaResponse } from "@/services/inventoryService";

interface InventoryFormProps {
  onTransactionComplete?: (response: HederaResponse) => void;
}

const InventoryForm = ({ onTransactionComplete }: InventoryFormProps) => {
  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName.trim() || !sku.trim() || !price.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid price.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const inventoryItem: InventoryItem = {
      itemName: itemName.trim(),
      sku: sku.trim(),
      price: priceNumber,
      timestamp: new Date().toISOString(),
    };

    try {
      const responseData = await InventoryService.addInventoryItem(inventoryItem);
      
      toast({
        title: "Success!",
        description: "Item successfully added to Hedera ledger",
        variant: "default",
      });
      
      // Reset form
      setItemName("");
      setSku("");
      setPrice("");
      
      // Call completion callback with response
      if (onTransactionComplete) {
        onTransactionComplete(responseData);
      }

    } catch (error) {
      console.error('Detailed error sending data to n8n:', error);
      
      toast({
        title: "Error Details",
        description: `${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl bg-gradient-card border-0">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-3">
          <div className="p-3 bg-gradient-primary rounded-full shadow-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Add Inventory Item
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Register a new item on the Hedera ledger
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName" className="text-sm font-medium">
              Item Name *
            </Label>
            <Input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Solana Pearl Earrings"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sku" className="text-sm font-medium">
              SKU *
            </Label>
            <Input
              id="sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="e.g., SPE-001"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 299.99"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <Button 
            type="submit" 
            variant="gradient"
            size="lg"
            disabled={isLoading}
            className="w-full mt-6"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add to Ledger
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="h-3 w-3 text-success" />
            <span>Secured by Hedera Consensus Service</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryForm;