export interface DownloadResult {
  success: boolean;
  method: 'blob' | 'fallback-tab';
  message: string;
}

/**
 * Downloads a wallpaper image reliably respecting cross-origin security rules.
 * If fetch(blob) is blocked by CORS, it falls back to opening the direct image
 * and instructs the user on saving to their photo gallery.
 */
export async function downloadWallpaper(
  imageUrl: string,
  fileName: string
): Promise<DownloadResult> {
  const sanitizedName = fileName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();

  try {
    const response = await fetch(imageUrl, {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${sanitizedName}-wallpaper.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);

    return {
      success: true,
      method: 'blob',
      message: 'Download started! Image saved to your device Downloads folder.',
    };
  } catch (err) {
    console.warn('Cross-origin direct download limited by browser security, initiating fallback:', err);

    // Fallback: open high-res image directly in a new tab
    const newWindow = window.open(imageUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      return {
        success: true,
        method: 'fallback-tab',
        message: 'Opened full-res image in a new tab. Press and hold (or right-click) to save to Photos.',
      };
    } else {
      // Popups blocked: navigate directly
      window.location.href = imageUrl;
      return {
        success: true,
        method: 'fallback-tab',
        message: 'Loading image. Save the picture to your photos to set as wallpaper.',
      };
    }
  }
}
