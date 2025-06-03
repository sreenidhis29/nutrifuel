export const theme = {
    colors: {
        primary: {
            main: '#4CAF50', // Green
            light: '#81C784',
            dark: '#388E3C',
        },
        secondary: {
            main: '#FFA726', // Light Orange
            light: '#FFB74D',
            dark: '#F57C00',
        },
        background: {
            default: '#F5F5F5', // Light grey background from designs
            paper: '#FFFFFF', // White card background
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        error: '#D32F2F',
        warning: '#FFA000',
        success: '#388E3C',
    },
    typography: {
        fontFamily: 'var(--font-geist-sans)',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
    },
} as const; 