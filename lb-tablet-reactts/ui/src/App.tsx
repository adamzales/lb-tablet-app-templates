import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Frame from './components/Frame';

import './App.css';

const devMode = !window?.['invokeNative'];

const App = () => {
    const [theme, setTheme] = useState('light');
    const [direction, setDirection] = useState('N');

    const [indicatorVisible, setIndicatorVisible] = useState(true);
    const [notificationText, setNotificationText] = useState('Notification text');
    const appDiv = useRef(null);

    useEffect(() => {
        if (devMode) {
            document.getElementsByTagName('html')[0].style.visibility = 'visible';
            document.getElementsByTagName('body')[0].style.visibility = 'visible';
            return;
        } else {
            setTheme(globalThis.settings?.display?.theme || 'light');

            globalThis.onSettingsChange((settings: any) => setTheme(settings.display.theme));
            if (!globalThis.GetParentResourceName) {
                document.getElementsByTagName('body')[0].style.visibility = 'visible';
            }
        }

        globalThis.useNuiEvent('updateDirection', (direction: string) => {
            setDirection(direction);
        });
    }, []);

    useEffect(() => {
        if (notificationText === '') setNotificationText('Notification text');
    }, [notificationText]);

    return (
        <AppProvider>
            <div className='app' ref={appDiv} data-theme={theme}>
                <div
                    className='app-wrapper'
                    style={{
                        height: window?.['invokeNative'] ? '100vh' : '100%'
                    }}
                >
                    <div className='header'>
                        <div className='title'>Custom App Template</div>
                        <div className='subtitle'>React TS</div>
                        <a className='subtitle'>{direction}</a>
                    </div>
                    <div className='button-wrapper'>
                        <button
                            id='button'
                            onClick={() => {
                                globalThis.setPopUp({
                                    title: 'Popup Menu',
                                    description: 'Confirm your choice',
                                    buttons: [
                                        {
                                            title: 'Cancel',
                                            color: 'red',
                                            cb: () => {
                                                console.log('Cancel');
                                            }
                                        },
                                        {
                                            title: 'Confirm',
                                            color: 'blue',
                                            cb: () => {
                                                console.log('Confirm');
                                            }
                                        }
                                    ]
                                });
                            }}
                        >
                            Popup Menu
                        </button>
                        <button
                            id='context'
                            onClick={() => {
                                globalThis.components?.setContextMenu({
                                    title: 'Context menu',
                                    buttons: [
                                        {
                                            title: 'Phone Notification',
                                            color: 'blue',
                                            cb: () => {
                                                globalThis.sendNotification({ title: notificationText });
                                            }
                                        },
                                        {
                                            title: 'GTA Notification',
                                            color: 'red',
                                            cb: () => {
                                                globalThis.fetchNui('drawNotification', { message: notificationText });
                                            }
                                        }
                                    ]
                                });
                            }}
                        >
                            Context menu
                        </button>

                        <button
                            id='gallery'
                            onClick={() => {
                                globalThis.components?.setGallery({
                                    includeVideos: true,
                                    includeImages: true,
                                    cb: (data: { src: string; isVideo: boolean; timestamp: number }) => {
                                        globalThis.setPopUp({
                                            title: 'Selected media',
                                            attachment: data,
                                            buttons: [
                                                {
                                                    title: 'OK'
                                                }
                                            ]
                                        });
                                    }
                                });
                            }}
                        >
                            Gallery Selector
                        </button>
                        <button
                            id='indicator'
                            onClick={() => {
                                globalThis.components?.setIndicatorVisible(!indicatorVisible);
                                setIndicatorVisible(!indicatorVisible);
                            }}
                        >
                            {indicatorVisible ? 'Hide Indicator' : 'Show Indicator'}
                        </button>
                        <button
                            id='colorpicker'
                            onClick={() => {
                                globalThis.components?.setColorPicker((color: string) => {
                                    globalThis.setPopUp({
                                        title: 'Selected color',
                                        description: color,
                                        buttons: [
                                            {
                                                title: 'OK'
                                            }
                                        ]
                                    });
                                });
                            }}
                        >
                            Color Picker
                        </button>

                        <input placeholder='Notification text' onChange={(e: ChangeEvent<HTMLInputElement>) => setNotificationText(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    if (devMode) {
        return (
            <div className='dev-wrapper'>
                <Frame>{children}</Frame>
            </div>
        );
    } else {
        return <>{children}</>;
    }
};

export default App;
