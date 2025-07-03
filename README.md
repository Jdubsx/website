# JDubs Personal Website

A modern, clean personal website/landing page built with vanilla HTML, CSS, and JavaScript. Perfect for showcasing your Web3 projects and professional profile.

## 🌟 Features

- **Modern Design**: Clean, professional layout with Web3-focused aesthetics
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth animations, project filtering, and dynamic navigation
- **Fast**: No frameworks, pure vanilla JavaScript for optimal performance
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🎨 Customization Guide

### 1. Personal Information

#### Update Your Profile Section
Replace the placeholder content in `index.html`:

```html
<!-- Line 45: Update your name -->
<h1 class="hero-title">
    Hey, I'm <span class="gradient-text">Your Name</span>
</h1>

<!-- Line 48: Update your title -->
<p class="hero-subtitle">
    Your Professional Title
</p>

<!-- Line 51: Replace with your personal description -->
<p class="hero-description">
    Your personal description here. Talk about your passion for Web3, 
    your background, and what drives you in this space.
</p>
```

#### Update Social Links
Find the social links section (around line 57) and update with your handles:

```html
<a href="https://twitter.com/yourhandle" class="social-link twitter">
<a href="https://github.com/yourusername" class="social-link github">
<a href="https://linkedin.com/in/yourprofile" class="social-link linkedin">
<a href="https://discord.gg/yourserver" class="social-link discord">
```

#### Update Contact Information
Replace placeholder contact info (around line 248):

```html
<p>your.email@domain.com</p>
<p>@yourtwitterhandle</p>
```

### 2. Projects Section

Replace the example projects with your actual projects. Each project tile should include:

- **Project Image**: Replace placeholder with actual project screenshots
- **Title & Description**: Your project details
- **Tags**: Technologies used
- **Links**: Live demo and GitHub repository links

Example project structure:
```html
<div class="project-tile" data-category="web3">
    <div class="project-image">
        <img src="path/to/your/project-image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Description of your project and its key features.</p>
        <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">Solidity</span>
            <span class="tag">Web3.js</span>
        </div>
        <div class="project-links">
            <a href="https://your-project.com" class="project-link">
                <i class="fas fa-external-link-alt"></i>
                View Project
            </a>
            <a href="https://github.com/you/project" class="project-link">
                <i class="fab fa-github"></i>
                Code
            </a>
        </div>
    </div>
</div>
```

### 3. Profile Image

Replace the placeholder profile icon with your actual photo:

1. Add your profile image to the project folder
2. Update the profile section in `index.html`:

```html
<div class="profile-image">
    <img src="your-profile-photo.jpg" alt="Your Name" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">
</div>
```

### 4. Color Scheme Customization

You can easily customize the color scheme by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary: #3b82f6;        /* Main blue */
    --secondary: #8b5cf6;      /* Purple accent */
    --accent: #06d6a0;         /* Green accent */
    /* Change these to your preferred colors */
}
```

## 🚀 Deployment to jdubs.xyz

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yoursite.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save

3. **Configure Custom Domain**:
   - In repository settings > Pages
   - Add your custom domain: `jdubs.xyz`
   - Create a `CNAME` file in your repository root with content: `jdubs.xyz`

4. **DNS Configuration**:
   - In your domain registrar (where you bought jdubs.xyz):
   - Add a CNAME record: `www` pointing to `yourusername.github.io`
   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

### Option 2: Netlify (Alternative)

1. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: (leave empty)
   - Set publish directory: (leave empty or set to `/`)

2. **Configure Custom Domain**:
   - In Netlify dashboard > Domain settings
   - Add custom domain: `jdubs.xyz`
   - Follow Netlify's DNS instructions

### Option 3: Traditional Web Hosting

1. **Upload Files**:
   - Use FTP/SFTP to upload all files to your hosting provider
   - Upload to the public_html or www folder

2. **DNS Configuration**:
   - Point your domain's A record to your hosting provider's IP
   - Wait for DNS propagation (24-48 hours)

## 📁 File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js          # JavaScript functionality
├── README.md          # This file
└── assets/            # Create this folder for images
    ├── images/        # Your project screenshots
    └── icons/         # Any custom icons
```

## 🛠️ Development Tips

### Local Development
- Simply open `index.html` in your browser
- Use a local server for better development experience:
  ```bash
  # Using Python
  python -m http.server 8000
  
  # Using Node.js
  npx serve .
  ```

### Adding New Projects
1. Copy an existing project tile in the HTML
2. Update the content with your project details
3. Add appropriate `data-category` for filtering
4. Include project images in the `assets/images/` folder

### Performance Optimization
- Optimize images before uploading (WebP format recommended)
- Consider using a CDN for faster loading
- Enable gzip compression on your server

## 🎯 Next Steps

1. **Customize Content**: Replace all placeholder content with your information
2. **Add Project Images**: Include screenshots of your actual projects
3. **Update Social Links**: Add your real social media profiles
4. **Deploy**: Choose a deployment method and go live
5. **SEO**: Update meta tags with your specific keywords
6. **Analytics**: Consider adding Google Analytics for visitor tracking

## 🔧 Troubleshooting

### Common Issues

**Images not loading**: 
- Check file paths are correct
- Ensure images are in the right folder
- Verify image file extensions match the HTML

**Mobile menu not working**:
- Check that JavaScript is loading properly
- Verify no console errors in browser dev tools

**Custom domain not working**:
- Wait for DNS propagation (can take 24-48 hours)
- Check DNS settings with your domain registrar
- Verify CNAME file is correctly configured

## 📞 Support

If you need help with customization or deployment, feel free to reach out!

---

**Built with ❤️ for the Web3 community** 