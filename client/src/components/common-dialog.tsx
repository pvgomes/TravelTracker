import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CommonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "terms" | "privacy";
}

const commonContent = {
  terms: {
    title: "Terms of Service",
    content: `
      1. Terms
      By accessing Globalia, you agree to be bound by these terms of service. The service is provided "as is" without any warranties.

      2. Use License
      Permission is granted to temporarily use Globalia for personal, non-commercial purposes.

      3. User Obligations
      Users must provide accurate information and maintain the security of their accounts.

      4. Content Guidelines
      Users are responsible for the content they share and must respect privacy and intellectual property rights.
    `
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      1. Data Collection
      We collect information you provide when creating an account and using Globalia.

      2. Data Usage
      Your information is used to provide and improve the service, and track visited countries.

      3. Data Protection
      We implement security measures to protect your personal information.

      4. User Rights
      You have the right to access, modify, or delete your personal information.
    `
  }
};

export function CommonDialog({ open, onOpenChange, type }: CommonDialogProps) {
  const { title, content } = commonContent[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert">
          <pre className="whitespace-pre-wrap font-sans">{content}</pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}