# FFF Design Assembly

Welcome to **FFF Design Assembly**! This project is a web experience combining modern design, smooth fade in/out transitions, accessibility best practices, and AI-powered strategies to help teams thrive in the age of artificial intelligence.

## 🌟 Key Updates and Features

- **Fade In/Out Transitions**  
   The Hero section now has smooth transitions when switching from the static background image to the background video, enhancing the visual experience.
- **Video `canplaythrough` Event**  
   The script waits for the video to fully load (`canplaythrough` event) before transitioning from the static background to the video, ensuring a seamless switch without flicker.
- **Reorganized Folder Structure**  
   Multiple CSS files have been added (or rearranged) to separate `reset.css`, `styles.css`, `utils.css`, and `typography.css`.
- **Enhanced Accessibility**  
   “Skip to content” and “skip to footer” links are now included to improve screen reader navigation.
- **External Links and Navigation**  
   Links to case studies, social media, and other resources have been added in the header and footer to make it easier for users to find additional information.
- **ARIA Landmarks**  
   ARIA landmarks have been added to define regions of the page, making it easier for screen readers to navigate.
- **Keyboard Navigation**  
   All interactive elements are accessible via keyboard, ensuring users can navigate the site without a mouse.
- **Color Contrast**  
   The color scheme has been adjusted to meet WCAG guidelines for contrast, improving readability for users with visual impairments.

## 📂 Project Structure

```
├── index.html
├── styles/
│   ├── reset.css
│   ├── styles.css
│   ├── utils.css
│   └── typography.css
├── scripts.js
├── assets/
│   ├── logo_symbol.svg
│   ├── logo.svg
│   ├── instagram.png
│   ├── behance.png
│   ├── linkedin.png
│   ├── favicon.png
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   └── (other image/video files)
├── README.md
└── (any other files if applicable)
```

## 🚀 Getting Started

1. Clone the repository:
    ```bash
    git clone git@github.com:akaTolan/biosite.git
    ```
2. Navigate to the project folder:
    ```bash
    cd biosite
    ```
3. Open the `index.html` file in your browser to view the project.

## 📚 Technologies Used

- **HTML5**: Semantic structure and accessible design.
- **CSS3**: Advanced styling with variables, transitions, and responsive design.
- **JavaScript**: Interactive features for enhanced UX.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.