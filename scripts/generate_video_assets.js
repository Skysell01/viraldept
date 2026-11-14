const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = path.resolve(__dirname, 'node_modules/ffmpeg-static/ffmpeg.exe');
const sourceVideo = path.resolve(__dirname, 'public/assets/videos/viraldept.mp4');

if (!fs.existsSync(sourceVideo)) {
  console.error('Source video not found:', sourceVideo);
  process.exit(1);
}

console.log('Using ffmpeg from:', ffmpegPath);
console.log('Source video:', sourceVideo);

// Helper function to run ffmpeg
function runFfmpeg(args, outputDesc) {
  const cmd = `"${ffmpegPath}" -y ${args}`;
  console.log(`\nGenerating: ${outputDesc}...`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`✓ Completed: ${outputDesc}`);
  } catch (err) {
    console.error(`✗ Error generating ${outputDesc}:`, err.message);
  }
}

// 1. HERO VIDEOS
// Hero Desktop (16:9 Landscape, 1280x720, 16s, H.264, muted, faststart)
runFfmpeg(
  `-ss 00:00:02 -i "${sourceVideo}" -t 16 -vf "crop=in_w:in_w*9/16,scale=1280:720" -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 23 -preset medium -an -movflags +faststart "public/videos/hero/hero-desktop.mp4"`,
  'Hero Desktop 16:9 Video'
);

// Hero Mobile (9:16 Portrait, 720x1280, 16s, H.264, muted, faststart)
runFfmpeg(
  `-ss 00:00:02 -i "${sourceVideo}" -t 16 -vf "scale=720:1280" -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 24 -preset medium -an -movflags +faststart "public/videos/hero/hero-mobile.mp4"`,
  'Hero Mobile 9:16 Video'
);

// 2. PROCESS SECTION (4 clips, ~5s each)
const processClips = [
  { name: 'discover.mp4', start: '00:00:00', duration: 5, desc: 'Process: Discover' },
  { name: 'match.mp4', start: '00:00:05', duration: 5, desc: 'Process: Match' },
  { name: 'create.mp4', start: '00:00:11', duration: 6, desc: 'Process: Create' },
  { name: 'amplify.mp4', start: '00:00:18', duration: 6, desc: 'Process: Amplify' },
];

for (const clip of processClips) {
  runFfmpeg(
    `-ss ${clip.start} -i "${sourceVideo}" -t ${clip.duration} -vf "scale=720:1280" -c:v libx264 -pix_fmt yuv420p -crf 24 -preset medium -an -movflags +faststart "public/videos/process/${clip.name}"`,
    clip.desc
  );
}

// 3. SERVICES SECTION (6 clips)
const serviceClips = [
  { name: 'influencer-marketing.mp4', start: '00:00:03', duration: 5, desc: 'Services: Influencer Marketing' },
  { name: 'ugc-content.mp4', start: '00:00:08', duration: 5, desc: 'Services: UGC Content' },
  { name: 'campaign-management.mp4', start: '00:00:13', duration: 5, desc: 'Services: Campaign Management' },
  { name: 'brand-collaboration.mp4', start: '00:00:18', duration: 5, desc: 'Services: Brand Collaboration' },
  { name: 'content-strategy.mp4', start: '00:00:23', duration: 5, desc: 'Services: Content Strategy' },
  { name: 'creator-partnerships.mp4', start: '00:00:28', duration: 5, desc: 'Services: Creator Partnerships' },
];

for (const clip of serviceClips) {
  runFfmpeg(
    `-ss ${clip.start} -i "${sourceVideo}" -t ${clip.duration} -vf "scale=720:1280" -c:v libx264 -pix_fmt yuv420p -crf 24 -preset medium -an -movflags +faststart "public/videos/services/${clip.name}"`,
    clip.desc
  );
}

// 4. POSTER IMAGES (WebP)
// Hero poster (from hero-desktop)
runFfmpeg(
  `-ss 00:00:01 -i "public/videos/hero/hero-desktop.mp4" -vframes 1 -q:v 85 "public/images/video-posters/hero-poster.webp"`,
  'Hero Desktop Poster (WebP)'
);

// Process posters
for (const clip of processClips) {
  const baseName = clip.name.replace('.mp4', '');
  runFfmpeg(
    `-ss 00:00:01 -i "public/videos/process/${clip.name}" -vframes 1 -q:v 85 "public/images/video-posters/${baseName}-poster.webp"`,
    `Poster: ${baseName}`
  );
}

// Services posters
for (const clip of serviceClips) {
  const baseName = clip.name.replace('.mp4', '');
  runFfmpeg(
    `-ss 00:00:01 -i "public/videos/services/${clip.name}" -vframes 1 -q:v 85 "public/images/video-posters/${baseName}-poster.webp"`,
    `Poster: ${baseName}`
  );
}

console.log('\n========================================');
console.log('All video assets and posters generated successfully!');
console.log('========================================');
