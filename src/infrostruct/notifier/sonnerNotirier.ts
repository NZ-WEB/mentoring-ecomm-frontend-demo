import type { INotifier } from '@/domain/services/notifier';
import { toast } from 'vue-sonner';

export const sonnerNotifier: INotifier = {
  notify(title: string): void {
    toast(title);
  },
};
