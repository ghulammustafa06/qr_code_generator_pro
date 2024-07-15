document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const downloadOptions = document.getElementById('downloadOptions');
    const downloadPNG = document.getElementById('downloadPNG');
    const downloadSVG = document.getElementById('downloadSVG');

    let qrCode;

    generateBtn.addEventListener('click', generateQRCode);
    downloadPNG.addEventListener('click', () => downloadQR('png'));
    downloadSVG.addEventListener('click', () => downloadQR('svg'));

    function generateQRCode() {
        const url = urlInput.value.trim();
        if (url === '') {
            alert('Please enter a URL or text');
            return;
        }

        qrCodeContainer.innerHTML = '';
        qrCode = new QRCode(qrCodeContainer, {
            text: url,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadOptions.style.display = 'flex';
    }

    function downloadQR(format) {
        if (!qrCode) return;

        const canvas = qrCodeContainer.querySelector('canvas');
        const dataURL = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.download = `qrcode.${format}`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});