import { useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import {
	AppreciationScene,
	ConnectedJourneyScene,
	GmailReferralSequence,
	MobileAppreciationScene,
	MobileJourneyScene,
	MobileSignalScene,
} from './RightReferScenes';

export type RemotionVariant = 'signal' | 'journey' | 'appreciation';

interface Props {
	variant: RemotionVariant;
	className?: string;
}

const scenes = {
	signal: {
		component: GmailReferralSequence,
		compactComponent: MobileSignalScene,
		durationInFrames: 240,
		width: 1280,
		height: 800,
		compactWidth: 390,
		compactHeight: 520,
		label: 'Animated Gmail opportunity email showing a timely Microsoft role and referral path',
	},
	journey: {
		component: ConnectedJourneyScene,
		compactComponent: MobileJourneyScene,
		durationInFrames: 210,
		width: 1280,
		height: 680,
		compactWidth: 390,
		compactHeight: 520,
		label: 'Animated three-step Microsoft subscription, referrer selection, and referral progress flow',
	},
	appreciation: {
		component: AppreciationScene,
		compactComponent: MobileAppreciationScene,
		durationInFrames: 210,
		width: 900,
		height: 640,
		compactWidth: 390,
		compactHeight: 480,
		label: 'Animated optional appreciation and referral request flow',
	},
} as const;

export default function RemotionPlayer({ variant, className = '' }: Props) {
	const config = scenes[variant];
	const playerRef = useRef<PlayerRef>(null);
	const rootRef = useRef<HTMLDivElement>(null);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [visible, setVisible] = useState(false);
	const [compact, setCompact] = useState(false);

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setReducedMotion(media.matches);
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		const media = window.matchMedia('(max-width: 700px)');
		const update = () => setCompact(media.matches);
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const observer = new IntersectionObserver(
			([entry]) => setVisible(entry?.isIntersecting ?? false),
			{ threshold: 0.25 },
		);
		observer.observe(root);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const player = playerRef.current;
		if (!player) return;

		const sync = () => {
			if (visible && !reducedMotion && document.visibilityState === 'visible') player.play();
			else player.pause();
		};

		sync();
		document.addEventListener('visibilitychange', sync);
		return () => document.removeEventListener('visibilitychange', sync);
	}, [reducedMotion, visible]);

	const useCompact = compact;
	const Scene = useCompact ? config.compactComponent : config.component;
	const compositionWidth = useCompact ? config.compactWidth : config.width;
	const compositionHeight = useCompact ? config.compactHeight : config.height;

	return (
		<div
			ref={rootRef}
			className={`remotion-player remotion-player-${variant} ${useCompact ? 'is-compact' : ''} ${className}`}
			role="img"
			aria-label={config.label}
		>
			<Player
				key={`${reducedMotion ? 'reduced' : 'animated'}-${useCompact ? 'compact' : 'wide'}`}
				ref={playerRef}
				component={Scene}
				durationInFrames={config.durationInFrames}
				compositionWidth={compositionWidth}
				compositionHeight={compositionHeight}
				fps={30}
				initialFrame={reducedMotion ? config.durationInFrames - 1 : 0}
				autoPlay={!reducedMotion}
				loop={!reducedMotion}
				controls={false}
				clickToPlay={false}
				doubleClickToFullscreen={false}
				spaceKeyToPlayOrPause={false}
				allowFullscreen={false}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}
