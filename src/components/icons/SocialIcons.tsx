import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
};

export const GitHubIcon = (props: IconProps) => (
    <svg {...baseProps} {...props}>
        <path d="M9 19c-4.5 1.5-4.5-2.25-6-2.25" />
        <path d="M15 22v-2.5c0-.75.25-1.5.75-2" />
        <path d="M15 18c3.5 1 5.25-1.25 5.25-4.25 0-1.25-.25-2.25-.75-3.25.5-.75.75-1.75.75-3 0 0-1-.25-3 .75-1.75-1-4.25-1-6 0-2-.5-3-.75-3-.75 0 1.25.25 2.25.75 3-.5 1-.75 2-.75 3.25C8 16.75 9.75 19 13.25 18" />
        <path d="M10.5 22v-2.5" />
    </svg>
);

export const LinkedInIcon = (props: IconProps) => (
    <svg {...baseProps} {...props}>
        <path d="M6.5 9.5V18" />
        <path d="M6.5 6.5v.25" />
        <path d="M10 18v-4.25c0-1.75 1.25-2.75 2.75-2.75s2.25 1 2.25 2.75V18" />
        <path d="M18 18v-6" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
);

export const TwitchIcon = (props: IconProps) => (
    <svg {...baseProps} {...props}>
        <path d="M4 5h16v9l-4 4h-4l-2 2H8v-2H4V5Z" />
        <path d="M9 9v4" />
        <path d="M13 9v4" />
        <path d="M15 9v4" />
    </svg>
);

export const YouTubeIcon = (props: IconProps) => (
    <svg {...baseProps} {...props}>
        <rect x="3.5" y="7" width="17" height="10" rx="3" />
        <path d="M11 10.5l4 1.5-4 1.5v-3Z" />
    </svg>
);

export const EmailIcon = (props: IconProps) => (
    <svg {...baseProps} {...props}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
);
