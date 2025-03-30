"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
  displayText?: string;
}

export default function CopyButton({ text, className = "", displayText }: CopyButtonProps) {
  const [copying, setCopying] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopying(true);

    toast({
      title: "Скопировано в буфер обмена",
      duration: 1500,
      className: "bg-background border border-border text-foreground",
    });

    setTimeout(() => setCopying(false), 1000);
  };

  if (!displayText) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className={`h-8 w-8 p-0 ${className}`}
      >
        {copying ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Копировать в буфер обмена</span>
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={`p-0 h-auto text-foreground hover:text-kamni-yellow inline-flex items-center justify-between font-mono group w-full ${className}`}
            onClick={handleCopy}
          >
            <span className="truncate">{displayText || text}</span>
            {copying ? (
              <Check className="ml-2 h-4 w-4 shrink-0" />
            ) : (
              <Copy className="ml-2 h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background border border-border text-foreground">
          <p>Нажмите, чтобы скопировать</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
