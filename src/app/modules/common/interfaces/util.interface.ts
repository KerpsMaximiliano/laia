// * Sorts.
import { Icon } from '@sorts/icon.sort';

export interface IButton {
	label: string;
	action: string;
	icon: Icon | null;
	visibility: boolean;
}
