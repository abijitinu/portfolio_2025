import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                artist: resolve(__dirname, 'artist.html'),
                artistAbout: resolve(__dirname, 'artist-about.html'),
                artistContact: resolve(__dirname, 'artist-contact.html'),
                projectAr: resolve(__dirname, 'project-ar-visualiser.html'),
                projectCampaign: resolve(__dirname, 'project-campaign-system.html'),
                projectPerfit: resolve(__dirname, 'project-perfit.html'),
                projectSales: resolve(__dirname, 'project-sales-portal.html'),
                projectSita: resolve(__dirname, 'project-sita-design.html'),
                projectRestrata: resolve(__dirname, 'project-restrata-supervisor.html'),
            },
        },
    },
});
