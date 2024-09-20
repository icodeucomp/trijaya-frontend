export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  content: string;
  images: string[];
  category: string;
}
