import { ExternalLink, Bot, Link, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const navItems = [
    {
      href: "http://localhost:3001",
      icon: Bot,
      title: "AI Chatbot",
      description: "Query inventory with AI"
    },
    {
      href: "http://localhost:3002", 
      icon: Link,
      title: "Blockchain UI",
      description: "View Hedera transactions"
    },
    {
      href: "http://localhost:5678",
      icon: Settings,
      title: "n8n Workflows",
      description: "Manage automation"
    }
  ];

  return (
    <nav className={`flex items-center gap-3 ${className}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.href}
            variant="professional"
            size="sm"
            asChild
            className="group"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.description}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">{item.title}</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </Button>
        );
      })}
    </nav>
  );
};

export default Navigation;