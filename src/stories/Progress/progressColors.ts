import theme from 'src/styles/theme';

export const PROGRESS_COLOR_SCHEME = {
    complete: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.teal
    },
    succeeded: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.teal
    },
    finished: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.teal
    },
    canceled: {
        fgColor: '#484857',
        bgColor: '#aae2e2'
    },
    server_canceled: {
        fgColor: '#484857',
        bgColor: '#aae2e2'
    },
    rejected: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.red
    },
    failed: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.red
    },
    timeout: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.red
    },
    out_of_memory: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.red
    },
    downloading_image: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.lavender
    },
    running: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.lavender
    },
    retrying: {
        fgColor: '#ffffff',
        bgColor: theme?.colors?.lavender
    },
    enqueued: {
        fgColor: theme?.colors?.gunpowder,
        bgColor: theme?.colors?.selago
    },
    requested: {
        fgColor: theme?.colors?.gunpowder,
        bgColor: theme?.colors?.selago
    },
    pending: {
        fgColor: theme?.colors?.gunpowder,
        bgColor: theme?.colors?.selago
    }
};
