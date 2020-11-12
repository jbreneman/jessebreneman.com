const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        script.setAttribute('async', '');
        script.src = src;
        document.head.append(script);
    });
}


export default ({ $config }) => {
    if ($config.panelbearId) {
        loadScript(`https://cdn.panelbear.com/analytics.js?site=${$config.panelbearId}`)
            .then(() => {
                // eslint-disable-next-line no-undef
                window.panelbear = window.panelbear || function(){ window.panelbearQ = window.panelbearQ || []; panelbearQ.push(arguments); };
                // eslint-disable-next-line no-undef
                panelbear('config', { site: $config.panelbearId });
            });
    }
}
