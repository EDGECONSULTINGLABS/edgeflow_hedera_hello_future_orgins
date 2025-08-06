import Navigation from "./Navigation";
import { Activity, Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-card border-b border-border/50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  EdgeFlow
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Enhanced Inventory Management
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 ml-2 px-2 py-1 bg-success/10 rounded-full">
              <Zap className="h-3 w-3 text-success" />
              <span className="text-xs font-medium text-success">Powered by Hedera</span>
            </div>
          </div>
          
          {/* Navigation */}
          <Navigation className="hidden md:flex" />
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-border/50">
          <Navigation className="flex flex-wrap justify-center" />
        </div>
      </div>
    </header>
  );
};

export default Header;