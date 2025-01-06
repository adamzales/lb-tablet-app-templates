// You can ignore this file. All it does is make the UI work on your browser.
window.addEventListener('load', () => {
    const tabletWrapper = document.getElementById('tablet-wrapper');
    const app = tabletWrapper.querySelector('.app');

    if (window.invokeNative) {
        tabletWrapper.parentNode.insertBefore(app, tabletWrapper);
        tabletWrapper.parentNode.removeChild(tabletWrapper);
        return;
    }

    document.getElementById('tablet-wrapper').style.display = 'block';
    document.body.style.visibility = 'visible';

    // Create the Frame element
    const createFrame = (children) => {
        const frame = document.createElement('div');
        frame.classList.add('tablet-frame');

        // Create the tablet content container and append children to it
        const tabletContent = document.createElement('div');
        tabletContent.classList.add('tablet-content');
        tabletContent.appendChild(children);

        const tabletIndicator = document.createElement('div');
        tabletIndicator.classList.add('tablet-indicator');

        // Append the content to the frame
        frame.appendChild(tabletContent);
        frame.appendChild(tabletIndicator);

        return frame;
    };

    const devWrapper = document.createElement('div');
    devWrapper.classList.add('dev-wrapper');

    const frame = createFrame(app);
    devWrapper.appendChild(frame);
    devWrapper.style.display = 'block';

    tabletWrapper.parentNode.insertBefore(devWrapper, tabletWrapper);
    tabletWrapper.parentNode.removeChild(tabletWrapper);

    const center = () => (document.getElementById('tablet-wrapper').style.scale = window.innerWidth / 1920);
    center();

    window.addEventListener('resize', center);
});
