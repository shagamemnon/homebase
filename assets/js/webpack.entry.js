// Load stylesheets
import '../css/main.min.css';

// Load default scripts
import './prism.js';
import './jquery.fitvids.js';
import './index.js';

// Load custom components
import touchMenu from './components/touchMenu.js';


// Instantiate the touch menu
var tm = new touchMenu({
    bodyOpenedClass: 'nav-opened',
    bodyClosedClass: 'nav-closed',
    closeButton: '.back-icno',
    openButton: '.project-link',
    nav: 'nav',
    content: '.site-wrapper'
});
tm.init();
