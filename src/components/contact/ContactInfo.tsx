
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";

interface ContactInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactInfo = ({ isOpen, onClose }: ContactInfoProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div className="flex flex-col">
              <a href="tel:+916300500266" className="text-lg hover:text-blue-600">
                +91 6300500266
              </a>
              <a href="tel:+917981012359" className="text-lg hover:text-blue-600">
                +91 7981012359
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <div className="flex flex-col">
              <a
                href="mailto:cssoftwaresolutions@gmail.com"
                className="text-lg hover:text-blue-600"
              >
                cssoftwaresolutions@gmail.com
              </a>
              <a
                href="mailto:chaitanyakumarreddybijjum@gmail.com"
                className="text-lg hover:text-blue-600"
              >
                chaitanyakumarreddybijjum@gmail.com
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfo;
