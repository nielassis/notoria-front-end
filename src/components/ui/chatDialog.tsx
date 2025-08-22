"use client";

import * as React from "react";
import * as ChatDialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function ChatDialog({
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Root>) {
  return <ChatDialogPrimitive.Root data-slot="Chatdialog" {...props} />;
}

function ChatDialogTrigger({
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Trigger>) {
  return (
    <ChatDialogPrimitive.Trigger data-slot="Chatdialog-trigger" {...props} />
  );
}

function ChatDialogPortal({
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Portal>) {
  return (
    <ChatDialogPrimitive.Portal data-slot="Chatdialog-portal" {...props} />
  );
}

function ChatDialogClose({
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Close>) {
  return <ChatDialogPrimitive.Close data-slot="Chatdialog-close" {...props} />;
}

function ChatDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Overlay>) {
  return (
    <ChatDialogPrimitive.Overlay
      data-slot="Chatdialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function ChatDialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <ChatDialogPortal data-slot="Chatdialog-portal">
      <ChatDialogOverlay />
      <ChatDialogPrimitive.Content
        data-slot="Chatdialog-content"
        className={cn(
          "bg-background max-h-screen overflow-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-0 right-0 z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <ChatDialogPrimitive.Close
            data-slot="Chatdialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </ChatDialogPrimitive.Close>
        )}
      </ChatDialogPrimitive.Content>
    </ChatDialogPortal>
  );
}

function ChatDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="Chatdialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function ChatDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="Chatdialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function ChatDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Title>) {
  return (
    <ChatDialogPrimitive.Title
      data-slot="Chatdialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function ChatDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof ChatDialogPrimitive.Description>) {
  return (
    <ChatDialogPrimitive.Description
      data-slot="Chatdialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  ChatDialog,
  ChatDialogClose,
  ChatDialogContent,
  ChatDialogDescription,
  ChatDialogFooter,
  ChatDialogHeader,
  ChatDialogOverlay,
  ChatDialogPortal,
  ChatDialogTitle,
  ChatDialogTrigger,
};
