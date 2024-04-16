import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

// * Components.
import { ButtonComponent } from '@components/button/button.component';

// * Services.

// * Material.
import { MatExpansionModule } from '@angular/material/expansion';
import { ImgComponent } from '../../../../../../core/components/img/img.component';
import { ILanding, data } from './landing.interface';
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-admin-sell-landing',
	standalone: true,
	imports: [MatExpansionModule, ButtonComponent, ImgComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
	@ViewChild('video') public video?: ElementRef<HTMLVideoElement>;
	@ViewChild('audio') public audio?: ElementRef<HTMLAudioElement>;

	public data: ILanding = data;
	public muted: boolean = true; // MUTE DEL AUDIO
	public selected: number = 0; // Pagina actual
	public time: number[] = [];

	public touchStartX: number = 0;

	@HostListener('touchstart', ['$event'])
	public onTouchStart(event: TouchEvent): void {
		this.touchStartX = event.touches[0].clientX;
	}

	@HostListener('touchend', ['$event'])
	public onTouchEnd(event: TouchEvent): void {
		const touchEndX = event.changedTouches[0].clientX;
		const distance = touchEndX - this.touchStartX;

		if (distance < -100 && this.data.item.length !== this.selected + 1) {
			if (this.data.item[this.selected].btype === 'VIDEO') {
				this.video?.nativeElement.pause();
			}

			this.selected++;

			if (this.data.item[this.selected].btype === 'VIDEO') {
				void this.video?.nativeElement.play();
			}
		} else if (distance > 100 && this.selected > 0) {
			if (this.data.item[this.selected].btype === 'VIDEO') {
				this.video?.nativeElement.pause();
			}

			this.selected--;

			if (this.data.item[this.selected].btype === 'VIDEO') {
				void this.video?.nativeElement.play();
			}
		}
	}

	public ngAfterViewInit(): void {
		void this.video?.nativeElement.play();
		void this.audio?.nativeElement.play();
	}

	public replay(): void {
		if (this.video) {
			void this.video.nativeElement.play();
			this.video.nativeElement.currentTime = 0;
		}
		if (this.audio) {
			void this.audio.nativeElement.play();
			this.audio.nativeElement.currentTime = 0;
		}
	}
}
