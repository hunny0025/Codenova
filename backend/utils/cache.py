import time

class Cache:
    """Simple in-memory cache with TTL (time-to-live) support."""

    def __init__(self, default_ttl=300):
        """
        Args:
            default_ttl: Default time-to-live in seconds (5 minutes).
        """
        self._data = {}
        self.default_ttl = default_ttl

    def get(self, key):
        """Returns cached value if it exists and hasn't expired, else None."""
        entry = self._data.get(key)
        if entry is None:
            return None
        value, expiry = entry
        if expiry and time.time() > expiry:
            del self._data[key]
            return None
        return value

    def set(self, key, value, ttl=None):
        """
        Stores a value in cache.
        Args:
            key: Cache key.
            value: Value to store.
            ttl: Time-to-live in seconds. None uses default. 0 means no expiry.
        """
        if ttl is None:
            ttl = self.default_ttl
        expiry = time.time() + ttl if ttl > 0 else None
        self._data[key] = (value, expiry)

    def clear(self):
        """Clears all cached data."""
        self._data = {}

# Global cache instance (5 minute default TTL)
cache = Cache(default_ttl=600)
