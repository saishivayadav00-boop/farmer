# Re-export CropPrice as MandiPrice for backward compatibility
from models.crop_price import CropPrice as MandiPrice

__all__ = ['MandiPrice']
