# 🚀 Tutorial: Deploying a Static Site with GitHub Pages

This guide walks you through setting up a static blog on GitHub Pages using the specified repository name and file structure.

---

### Step 1: Create the GitHub Repository

You must create a special repository named exactly after your GitHub username followed by `.github.io`.

1.  Log in to your GitHub account.
2.  Click the **+** sign in the upper right corner and select **New repository**.
3.  Set the **Repository name** to exactly: `user-name.github.io`
4.  Ensure the repository is set to **Public** (required for GitHub Pages).
5.  Check the box to **Initialize this repository with a README**.
6.  Click **Create repository**.

### Step 2: Create Your `index.html` File

This file will be the homepage of your blog.

1.  Navigate to your newly created repository: `user-name.github.io`.
2.  Click the **Add file** dropdown, and then select **Create new file**.
3.  Name the file exactly: `index.html`
4.  Copy the entire HTML code below and paste it into the editor window.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Simple Blog Homepage</title>
</head>
<body>

    <header>
        <h1>Welcome to My Static Blog</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Me</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
        <hr>
    </header>

    <main>
        <h2>Latest Articles</h2>

        <article>
            <h3><a href="post-one.html">The Joys of Static Site Generators</a></h3>
            <p>
                Published on: December 15, 2025 | Category: Technology
            </p>
            <p>
                This is a short summary of the first blog post. It discusses the benefits of using static site hosting, like GitHub Pages, for simple, fast, and secure websites. 
            </p>
            <p><a href="post-one.html">Read More &raquo;</a></p>
            <hr>
        </article>
        
        <article>
            <h3><a href="post-two.html">My Favorite Recipes for the Holiday Season</a></h3>
            <p>
                Published on: December 10, 2025 | Category: Food
            </p>
            <p>
                A quick look at my top three dessert recipes, perfect for sharing with family and friends during the end-of-year holidays.
            </p>
            <p><a href="post-two.html">Read More &raquo;</a></p>
            <hr>
        </article>

        </main>

    <footer>
        <p>&copy; 2025 My Static Blog. All rights reserved.</p>
        <p>This site is built entirely with HTML.</p>
    </footer>

</body>
</html>
```

5. Scroll down to the "Commit changes" section. Add a short, descriptive message (e.g., "Add initial index.html file").
6. Ensure Commit directly to the main branch is selected.
7. Click Commit new file.

### Step 3: Configure GitHub Pages Source
This step ensures GitHub Pages is deploying from the correct location.

1. Navigate back to your repository (user-name.github.io).
2. Click the Settings tab.
3. In the left sidebar, click Pages.
4. Under the "Build and deployment" section:
-- Ensure the Source is set to Deploy from a branch.
5. Under the "Branch" section:
-- Set the branch to main (or master).
-- Ensure the folder is set to / (root).
6. Click Save.

### 🌐 Verification
- Wait a few minutes for the GitHub Pages build process to complete.
- Your simple blog homepage will be live at: https://user-name.github.io
