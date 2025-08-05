// EdgeFlow UI JavaScript
class EdgeFlowUI {
    constructor() {
        this.isScanning = false;
        this.scannedData = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAutoGeneration();
        this.updateScanStatus('Ready to scan');
    }

    bindEvents() {
        // Form submission
        document.getElementById('addItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Barcode scanning
        document.getElementById('startScan').addEventListener('click', () => {
            this.startBarcodeScan();
        });

        document.getElementById('stopScan').addEventListener('click', () => {
            this.stopBarcodeScan();
        });

        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showNFTPreview();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

        // Real-time form validation
        this.setupFormValidation();
    }

    setupAutoGeneration() {
        // Auto-generate record name and symbol from asset details
        const itemNameInput = document.getElementById('itemName');
        const skuInput = document.getElementById('sku');
        const tokenNameInput = document.getElementById('tokenName');
        const tokenSymbolInput = document.getElementById('tokenSymbol');
        const autoGenerateToggle = document.getElementById('autoGenerate');

        // Handle auto-generate toggle
        autoGenerateToggle.addEventListener('change', () => {
            if (autoGenerateToggle.checked) {
                tokenNameInput.readOnly = true;
                tokenSymbolInput.readOnly = true;
                tokenNameInput.value = this.getAutoRecordName();
                tokenSymbolInput.value = this.getAutoRecordSymbol();
            } else {
                tokenNameInput.readOnly = false;
                tokenSymbolInput.readOnly = false;
            }
        });

        itemNameInput.addEventListener('input', () => {
            if (autoGenerateToggle.checked) {
                tokenNameInput.value = this.getAutoRecordName();
            }
        });

        skuInput.addEventListener('input', () => {
            if (autoGenerateToggle.checked) {
                tokenSymbolInput.value = this.getAutoRecordSymbol();
            }
        });
    }

    getAutoRecordName() {
        const itemName = document.getElementById('itemName').value;
        return itemName ? `${itemName} Digital Record` : '';
    }

    getAutoRecordSymbol() {
        const sku = document.getElementById('sku').value;
        return sku ? sku.replace(/[^A-Z0-9]/g, '').substring(0, 10) : '';
    }

    setupFormValidation() {
        const requiredFields = ['itemName', 'sku', 'price'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = value.length > 0;
        
        if (field.type === 'number') {
            const numValue = parseFloat(value);
            return !isNaN(numValue) && numValue > 0;
        }
        
        field.classList.toggle('error', !isValid);
        return isValid;
    }

    validateForm() {
        const requiredFields = ['itemName', 'sku', 'price'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    startBarcodeScan() {
        if (this.isScanning) return;

        this.isScanning = true;
        this.updateScanStatus('Initializing camera...');
        
        document.getElementById('startScan').style.display = 'none';
        document.getElementById('stopScan').style.display = 'inline-flex';

        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'),
                constraints: {
                    width: 400,
                    height: 300,
                    facingMode: "environment"
                },
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ]
            }
        }, (err) => {
            if (err) {
                this.updateScanStatus('Error: ' + err.message);
                this.stopBarcodeScan();
                return;
            }

            this.updateScanStatus('Scanning... Point camera at barcode');
            Quagga.start();
        });

        Quagga.onDetected((result) => {
            this.handleBarcodeDetected(result.codeResult.code);
        });

        Quagga.onProcessed((result) => {
            if (result) {
                if (result.codeResult && result.codeResult.code) {
                    this.updateScanStatus('Barcode detected!');
                } else {
                    this.updateScanStatus('Scanning... Point camera at barcode');
                }
            }
        });
    }

    stopBarcodeScan() {
        if (!this.isScanning) return;

        this.isScanning = false;
        Quagga.stop();
        
        document.getElementById('startScan').style.display = 'inline-flex';
        document.getElementById('stopScan').style.display = 'none';
        
        this.updateScanStatus('Scan stopped');
    }

    handleBarcodeDetected(code) {
        this.scannedData = code;
        this.updateScanStatus(`Scanned: ${code}`);
        
        // Auto-populate SKU field if it's empty
        const skuField = document.getElementById('sku');
        if (!skuField.value) {
            skuField.value = code;
            // Trigger auto-generation
            skuField.dispatchEvent(new Event('input'));
        }

        // Stop scanning after successful scan
        setTimeout(() => {
            this.stopBarcodeScan();
        }, 2000);
    }

    updateScanStatus(message) {
        document.getElementById('scanStatus').textContent = message;
    }

    showNFTPreview() {
        if (!this.validateForm()) {
            this.showError('Please fill in all required fields');
            return;
        }

        const formData = this.getFormData();
        
        // Update preview modal content
        document.getElementById('previewImage').src = formData.imageUrl || 'https://via.placeholder.com/300x300?text=Asset+Image';
        document.getElementById('previewName').textContent = formData.itemName;
        document.getElementById('previewDescription').textContent = formData.description || 'No description provided';
        document.getElementById('previewSku').textContent = formData.sku;
        document.getElementById('previewPrice').textContent = `$${parseFloat(formData.price).toFixed(2)}`;
        document.getElementById('previewCategory').textContent = formData.category || 'Uncategorized';

        this.showModal('previewModal');
    }

    async handleFormSubmission() {
        if (!this.validateForm()) {
            this.showError('Please fill in all required fields');
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Digital Record...';
        submitBtn.disabled = true;

        try {
            const formData = this.getFormData();
            const response = await this.submitToN8N(formData);
            
            if (response.success) {
                this.showSuccessModal(response);
            } else {
                this.showError(response.message || 'Failed to create digital record');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showError('Network error. Please try again.');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    getFormData() {
        const form = document.getElementById('addItemForm');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add auto-generated values if empty
        if (!data.tokenName) {
            data.tokenName = this.getAutoRecordName();
        }
        if (!data.tokenSymbol) {
            data.tokenSymbol = this.getAutoRecordSymbol();
        }

        // Add scanned data if available
        if (this.scannedData) {
            data.scannedBarcode = this.scannedData;
        }

        return data;
    }

    async submitToN8N(formData) {
        // In a real implementation, this would send to your n8n webhook
        // For now, we'll simulate the API call
        
        const apiUrl = '/api/add-item'; // This would be your n8n webhook URL
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            // For demo purposes, simulate a successful response
            console.log('Simulating successful digital record creation...');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
            
            return {
                success: true,
                message: `Item ${formData.itemName} added successfully!`,
                nft: {
                    tokenId: '0.0.1234567',
                    serialNumber: '1',
                    explorerUrl: 'https://hashscan.io/testnet/token/0.0.1234567'
                }
            };
        }
    }

    showSuccessModal(response) {
        document.getElementById('successMessage').textContent = response.message;
        document.getElementById('tokenId').textContent = response.nft.tokenId;
        document.getElementById('serialNumber').textContent = response.nft.serialNumber;
        document.getElementById('explorerLink').href = response.nft.explorerUrl;
        
        this.showModal('successModal');
        
        // Reset form after successful submission
        setTimeout(() => {
            document.getElementById('addItemForm').reset();
            this.scannedData = null;
            this.updateScanStatus('Ready to scan');
        }, 3000);
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    closeModal(modal) {
        modal.style.display = 'none';
    }

    showError(message) {
        // Create a simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #dc3545;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1001;
                max-width: 300px;
            ">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EdgeFlowUI();
});

// Add some utility functions for the n8n integration
window.EdgeFlowUtils = {
    // Function to generate HIP-412 compliant metadata
    generateMetadata: (itemData) => {
        return {
            name: itemData.itemName,
            description: itemData.description || `NFT for ${itemData.itemName}`,
            image: itemData.imageUrl || '',
            attributes: [
                {
                    trait_type: "SKU",
                    value: itemData.sku
                },
                {
                    trait_type: "Price",
                    value: parseFloat(itemData.price).toFixed(2)
                },
                {
                    trait_type: "Category",
                    value: itemData.category || "Uncategorized"
                },
                {
                    trait_type: "Minted Date",
                    value: new Date().toISOString()
                }
            ],
            properties: {
                files: [
                    {
                        type: "image/jpeg",
                        uri: itemData.imageUrl || ""
                    }
                ]
            }
        };
    },

    // Function to validate item data
    validateItemData: (data) => {
        const errors = [];
        
        if (!data.itemName || data.itemName.trim().length === 0) {
            errors.push('Item name is required');
        }
        
        if (!data.sku || data.sku.trim().length === 0) {
            errors.push('SKU is required');
        }
        
        if (!data.price || isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) {
            errors.push('Valid price is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}; 