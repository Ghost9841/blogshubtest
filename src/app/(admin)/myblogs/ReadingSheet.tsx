"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostReaderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePost: any;
}

export function PostReaderSheet({ open, onOpenChange, activePost }: PostReaderSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{activePost?.title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full pt-4">
          {activePost?.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activePost.coverImage}
              alt="cover"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: activePost?.content || "" }}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}