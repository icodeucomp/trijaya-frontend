export interface DashboardModalProps {
  isVisible: boolean;
  className: string;
  onClose: () => void;
  children: React.ReactNode;
}
