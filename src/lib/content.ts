import { Accent, OfferingKind, OUTCOME_DISCLAIMER, POLICY, SignUpIntent } from './constants';

/* ------------------------------------------------------------------ */
/* Links                                                               */
/* ------------------------------------------------------------------ */

const SIGNUP_BASE: string = import.meta.env.PUBLIC_APP_SIGNUP_URL || 'https://app.rightrefer.com/';

/** All CTAs redirect to the app's landing page directly — no intent query
 *  string. The `intent` param is kept for call-site clarity/future use but is
 *  intentionally unused here. */
export const signUpWith = (_intent: SignUpIntent): string => SIGNUP_BASE;

export const SIGNUP_URL: string = SIGNUP_BASE;
export const CONTACT_EMAIL: string =
	import.meta.env.PUBLIC_CONTACT_EMAIL || 'rightrefer.team@gmail.com';

export const PRIVACY_URL = '/privacy/' as const;
export const TERMS_URL = '/terms/' as const;

/* ------------------------------------------------------------------ */
/* Offerings                                                           */
/* ------------------------------------------------------------------ */

/**
 * One offering, as a single diagram node rather than a chapter.
 *
 * The three offerings used to each get a full chapter: an eyebrow, a
 * sentence-length title, a summary paragraph, and three bullets that mostly
 * restated the title in longer words. That is now a triptych — one professional
 * network, three roles radiating from it — so each offering only needs a
 * short label, one line under ten words, and its existing call to action.
 */
export interface Offering {
	readonly kind: OfferingKind;
	readonly title: string;
	/** Always ten words or fewer — this is the node's entire explanation. */
	readonly line: string;
	readonly ctaLabel: string;
	readonly ctaHref: string;
	readonly accent: Accent;
}

export const OFFERINGS: readonly Offering[] = [
	{
		kind: OfferingKind.AskForReferral,
		title: 'Ask for a referral',
		line: 'Reach people inside the company you want to join.',
		ctaLabel: 'Ask for a referral',
		ctaHref: signUpWith(SignUpIntent.Seeker),
		accent: Accent.Primary,
	},
	{
		kind: OfferingKind.GiveReferral,
		title: 'Give a referral',
		line: 'Choose a candidate. Make an introduction that matters.',
		ctaLabel: 'Start referring',
		ctaHref: signUpWith(SignUpIntent.Giver),
		accent: Accent.Success,
	},
	{
		kind: OfferingKind.PeerSignal,
		title: 'Hear about openings',
		line: 'Discover relevant roles and find a way in.',
		ctaLabel: 'Get peer openings',
		ctaHref: signUpWith(SignUpIntent.Peer),
		accent: Accent.Reward,
	},
] as const;

/* ------------------------------------------------------------------ */
/* The three paths                                                     */
/* ------------------------------------------------------------------ */

export interface PathStep {
	readonly index: string;
	readonly title: string;
	/** One sentence. If it needs two, the title is not doing its job. */
	readonly detail: string;
}

export interface ProductPath {
	readonly kind: OfferingKind;
	/** Short label for the switch. Two or three words. */
	readonly tab: string;
	readonly hint: string;
	readonly title: string;
	readonly summary: string;
	readonly note: string;
	readonly steps: readonly PathStep[];
	readonly ctaLabel: string;
	readonly ctaHref: string;
	readonly accent: Accent;
}

/*
 * The product has three core things a member can do, and they are parallel,
 * not sequential: ask for a referral, give one, or hear about roles early.
 *
 * An earlier version told a single linear story from the seeker's side, which
 * read well and was wrong about the product twice over. It buried giving and
 * peer openings into two links at the bottom, and it put the thank-you at the
 * very end, after the referral had landed. The thank-you is chosen on the
 * request form, before anything is sent (PRD §5.2 step 7, §0.11), and getting
 * that backwards misrepresents the one part of the flow involving money.
 *
 * Three parallel paths want a switch, not a scroll.
 */
export const PRODUCT_PATHS: readonly ProductPath[] = [
	{
		kind: OfferingKind.AskForReferral,
		tab: 'Find a referral',
		hint: 'Your next move',
		title: 'The right role. A real introduction.',
		summary: 'Skip the cold messages. Put your request in front of people at the company you want to join.',
		note: OUTCOME_DISCLAIMER,
		accent: Accent.Primary,
		ctaLabel: 'Ask for a referral',
		ctaHref: signUpWith(SignUpIntent.Seeker),
		steps: [
			{
				index: '01',
				title: 'Bring the role you want',
				detail: 'Choose the company, add the job link and attach your resume.',
			},
			{
				index: '02',
				title: 'Choose your insiders',
				detail: 'Pick people yourself or use top-ranked matches, up to 25 per request.',
			},
			{
				index: '03',
				title: 'Keep it free. Or say thanks.',
				detail: 'Choose zero or add optional appreciation before sending; any payment happens upfront.',
			},
			{
				index: '04',
				title: 'Follow every step',
				detail: `Track the ${POLICY.claimWindowHours}-hour referral window, then get ${POLICY.confirmationWindowHours} hours to dispute a reported submission.`,
			},
		],
	},
	{
		kind: OfferingKind.GiveReferral,
		tab: 'Refer someone',
		hint: 'Open a door',
		title: 'One introduction. A new possibility.',
		summary: 'Help a candidate take their next step, on your terms and within your company policy.',
		note: 'Accept only requests you can act on. Claiming does not restart the referral deadline.',
		accent: Accent.Success,
		ctaLabel: 'Start referring',
		ctaHref: signUpWith(SignUpIntent.Giver),
		steps: [
			{
				index: '01',
				title: 'Make yourself discoverable',
				detail: 'Add your current company and role, then opt in to receiving referral requests.',
			},
			{
				index: '02',
				title: 'Choose who you can help',
				detail: 'Review requests sent to you. Accept one to take it on, or decline if it is not a fit.',
			},
			{
				index: '03',
				title: 'Refer through your company',
				detail: 'Use your internal referral process before the deadline, then mark the referral as sent.',
			},
			{
				index: '04',
				title: 'Receive optional appreciation',
				detail: `Eligible earnings clear after the ${POLICY.confirmationWindowHours}-hour dispute window, unless disputed; fees and payout details are shown in the app.`,
			},
		],
	},
	{
		kind: OfferingKind.PeerSignal,
		tab: 'Explore jobs',
		hint: 'Stay in the loop',
		title: 'Less searching. More possibilities.',
		summary: 'Browse openings, follow companies and hear about roles relevant to your experience.',
		note: 'Opening alerts share role details, not another candidate\u2019s identity or resume.',
		accent: Accent.Progress,
		ctaLabel: 'Explore openings',
		ctaHref: signUpWith(SignUpIntent.Peer),
		steps: [
			{
				index: '01',
				title: 'Find your kind of role',
				detail: 'Explore the openings board and check the original job description for the full picture.',
			},
			{
				index: '02',
				title: 'Follow companies you like',
				detail: 'Turn on company alerts to hear about relevant referral activity.',
			},
			{
				index: '03',
				title: 'Set your own pace',
				detail: 'Choose daily, weekly or highly relevant opening alerts to suit your search.',
			},
			{
				index: '04',
				title: 'Turn a role into a request',
				detail: 'Open a prefilled referral draft, review the details and choose who to ask before sending.',
			},
		],
	},
] as const;

/* ------------------------------------------------------------------ */
/* Proof line                                                          */
/* ------------------------------------------------------------------ */

/*
 * What used to be four trust cards.
 *
 * Each fact is now stated inside the beat it belongs to, so this line is a
 * recap rather than an argument: four short facts on one row, closing the
 * story rather than opening a new section about it.
 */
export const PRODUCT_PROOF: readonly string[] = [
	'LinkedIn sign-in',
	'Track your referral request',
	`${POLICY.confirmationWindowHours}h to dispute, decided by a person`,
	'Free to ask',
] as const;

/* ------------------------------------------------------------------ */
/* Hero trust strip                                                    */
/* ------------------------------------------------------------------ */

export interface TrustStripItem {
	readonly value: string;
	readonly label: string;
}

export const TRUST_STRIP: readonly TrustStripItem[] = [
	{ value: 'LinkedIn', label: 'Verified employment' },
	{ value: 'Referrer Appreciation, Your Way', label: 'Add an optional thank-you amount.' },
	{ value: '100% Free', label: 'No payment required' },
	{ value: '2-Day Response', label: 'Get clarity, sooner.' },
] as const;

/* ------------------------------------------------------------------ */
/* Frequently asked questions                                          */
/* ------------------------------------------------------------------ */

export interface FaqItem {
	readonly question: string;
	/** One or two short paragraphs. Kept as plain strings so the same array can
	 *  feed both the rendered section and the page's structured data. */
	readonly answer: string;
}

// Product contract: PRD §§0.5, 0.11–0.12, 0.23–0.24, 0.33 and 6.1.1–6.1.2.
export const FAQ_ITEMS: readonly FaqItem[] = [
	{
		question: 'Is it free to ask for a referral?',
		answer:
			'Yes. Choose zero appreciation and send your request without paying. If you want to add a thank-you, choose the amount before sending and pay upfront. It is optional and never guarantees a referral, interview or job.',
	},
	{
		question: 'Who actually sees my request?',
		answer:
			'Your request goes to the insiders selected for it, not a public feed. Pick people yourself or let RightRefer select top-ranked matches, up to 25. Only one insider can accept the request at a time; the accepting insider can access your full resume.',
	},
	{
		question: `What does the ${POLICY.claimWindowHours}-hour window mean?`,
		answer: `The referral deadline is ${POLICY.claimWindowHours} hours from request activation. Accepting a request does not restart it. If no referral is submitted in time, the request closes and any paid appreciation is refunded in full. It can close sooner if everyone declines. This is not a promise of a response or interview.`,
	},
	{
		question: 'How will I know my referral was sent?',
		answer:
			'The insider refers you through their company\u2019s process and marks it as sent in RightRefer. You receive an update and can track the request in the app. Evidence may be required by the request\u2019s review policy or if you raise a dispute; a screenshot is not required for every submission.',
	},
	{
		question: 'What if the referral was not actually sent?',
		answer: `Raise a dispute within ${POLICY.confirmationWindowHours} hours of the reported submission. The referrer is asked for evidence and a person reviews the case. If your dispute is upheld, any paid appreciation is refunded. Track refund progress in the app; bank processing is not instant.`,
	},
	{
		question: 'Can I withdraw my request?',
		answer:
			'Yes, while it is still a draft, awaiting payment or open for an insider to accept. Once someone accepts, you cannot withdraw it. They can release it, and the original referral deadline still applies.',
	},
	{
		question: 'Does a referral guarantee an interview?',
		answer: `No. ${OUTCOME_DISCLAIMER} A referrer can submit your profile, but the employer decides who gets an interview or offer. Adding appreciation does not change that.`,
	},
	{
		question: 'Does LinkedIn sign-in verify employment?',
		answer: 'No. LinkedIn sign-in authenticates an account; it does not verify a person\u2019s company, title or employment history. Members provide and confirm their own career details. An \u201cEmail verified\u201d badge refers only to the email address, not employment.',
	},
	{
		question: 'Can I ask for referrals and give them too?',
		answer:
			'Yes. Working members can do both from one account after adding their company and career details. Receiving requests is opt-in, and you choose which to accept. Decline requests that are not a fit and always follow your employer\u2019s referral policy.',
	},
	{
		question: 'How does referrer appreciation work?',
		answer:
			`Appreciation is an optional thank-you chosen by the seeker before sending. The referrer\u2019s eligible share clears after the ${POLICY.confirmationWindowHours}-hour dispute window, unless a dispute is open. Platform fees and any applicable payment charges affect the share; the app shows the breakdown. Withdrawals use UPI, so add payout details before withdrawing.`,
	},
	{
		question: 'What kinds of openings will I see?',
		answer:
			'The openings board brings together job details and referral activity. Check the linked job description, then open a prefilled referral draft for a role you like. Listings are not a promise of exclusive access, an unadvertised job or an available referrer.',
	},
	{
		question: 'Can I control opening alerts?',
		answer:
			'Yes. Follow companies and choose daily, weekly or highly relevant alerts in Opening alerts. These updates share role details, not another candidate\u2019s identity or resume. Essential updates about your own requests, payments and disputes stay separate.',
	},
] as const;
