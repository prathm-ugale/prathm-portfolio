This folder is optional.

The Resume buttons read `site.resumeUrl` in `src/data/site.js`, which currently
points at a Google Drive folder and opens in a new tab.

If you would rather host the PDF with the site instead of on Drive, drop the file
here (for example `prathmesh-ugale-resume.pdf`) and set:

    resumeUrl: "/resume/prathmesh-ugale-resume.pdf",

Anything inside `public/` is served from the site root, so the leading `/` is correct.
