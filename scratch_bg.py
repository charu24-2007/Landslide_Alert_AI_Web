from PIL import Image
import numpy as np

# Load the image
img = Image.open(r"c:\Users\charu\Desktop\LandSlide_Alert_AI\logo.png").convert("RGBA")
data = np.array(img)
h, w = data.shape[:2]

# The background is a dark blue gradient. 
# We'll use a region-growing (BFS) algorithm to remove it, starting from the 4 corners.
# To prevent eating into the logo, we'll use a strict color threshold and a spatial mask.

visited = np.zeros((h, w), dtype=bool)
to_clear = np.zeros((h, w), dtype=bool)

from collections import deque
queue = deque()

# Add all edge pixels
for x in range(w):
    queue.append((0, x))
    queue.append((h-1, x))
for y in range(h):
    queue.append((y, 0))
    queue.append((y, w-1))

def is_bg(r, g, b):
    # The background is dark blue: low red, low-mid green, mid blue
    # Generally, r < 60, g < 100, b < 150
    return r < 60 and g < 100 and b < 160 and b > r and b > g

# Perform BFS
count = 0
while queue:
    y, x = queue.popleft()
    if visited[y, x]:
        continue
    visited[y, x] = True
    
    r, g, b, a = data[y, x]
    
    if not is_bg(r, g, b):
        continue
        
    to_clear[y, x] = True
    count += 1
    
    # Add neighbors
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            # Check color distance to avoid jumping across edges
            nr, ng, nb, _ = data[ny, nx]
            if abs(int(nr) - int(r)) + abs(int(ng) - int(g)) + abs(int(nb) - int(b)) < 40:
                queue.append((ny, nx))

# Apply the mask
data[to_clear, 3] = 0

# For the pixels that are NOT cleared, some might have blue fringes.
# Let's not worry about fringing yet.

# Save the image
result = Image.fromarray(data)
result.save(r"c:\Users\charu\Desktop\LandSlide_Alert_AI\public\landslide-logo.png")
print(f"Cleared {count} pixels.")
