import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ThemeController = () => {
    const [selectedTheme, setSelectedTheme] = useState('default');

    // Carrega o tema salvo quando o componente é montado
    useEffect(() => {
        const savedTheme = Cookies.get('theme') || 'default';
        setSelectedTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // Função para lidar com a mudança de tema
    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
        Cookies.set('theme', theme, { expires: 365 }); // Salva por 1 ano
    };

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Tema
                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                <li>
                    <input 
                        type="radio" 
                        name="theme-dropdown" 
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
                        aria-label="Padrão" 
                        value="default"
                        checked={selectedTheme === 'default'}
                        onChange={() => handleThemeChange('default')}
                    />
                </li>
                <li>
                    <input 
                        type="radio" 
                        name="theme-dropdown" 
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
                        aria-label="Light" 
                        value="pastel"
                        checked={selectedTheme === 'pastel'}
                        onChange={() => handleThemeChange('pastel')}
                    />
                </li>
                <li>
                    <input 
                        type="radio" 
                        name="theme-dropdown" 
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
                        aria-label="Dark" 
                        value="dark"
                        checked={selectedTheme === 'dark'}
                        onChange={() => handleThemeChange('dark')}
                    />
                </li>
                <li>
                    <input 
                        type="radio" 
                        name="theme-dropdown" 
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
                        aria-label="Coffee" 
                        value="coffee"
                        checked={selectedTheme === 'coffee'}
                        onChange={() => handleThemeChange('coffee')}
                    />
                </li>
                <li>
                    <input 
                        type="radio" 
                        name="theme-dropdown" 
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start" 
                        aria-label="Dracula" 
                        value="dracula"
                        checked={selectedTheme === 'dracula'}
                        onChange={() => handleThemeChange('dracula')}
                    />
                </li>
            </ul>
        </div>
    );
};

export default ThemeController;