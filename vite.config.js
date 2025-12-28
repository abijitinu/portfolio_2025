
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
                projectArVisualiser: resolve(__dirname, 'project-ar-visualiser.html'),
                projectCampaignSystem: resolve(__dirname, 'project-campaign-system.html'),
                projectPerfit: resolve(__dirname, 'project-perfit.html'),
                projectRestrataSupervisor: resolve(__dirname, 'project-restrata-supervisor.html'),
                projectSalesPortal: resolve(__dirname, 'project-sales-portal.html'),
                projectSitaDesign: resolve(__dirname, 'project-sita-design.html'),
                projectThoughtBubble: resolve(__dirname, 'project-thought-bubble.html'),
            },
        },
    },
});
