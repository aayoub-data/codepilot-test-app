"""
Accessibility tests for the import page assets and component.
"""
import os
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def test_import_your_data_png_exists():
    """The placeholder PNG asset must exist at the expected path."""
    asset_path = os.path.join(REPO_ROOT, "src", "assets", "images", "import-your-data.png")
    assert os.path.isfile(asset_path), (
        f"Missing asset: {asset_path}. "
        "Expected a placeholder PNG at src/assets/images/import-your-data.png."
    )


def test_import_your_data_png_is_valid():
    """The file must begin with the PNG magic bytes (\\x89PNG)."""
    asset_path = os.path.join(REPO_ROOT, "src", "assets", "images", "import-your-data.png")
    if not os.path.isfile(asset_path):
        return  # handled by existence test
    with open(asset_path, "rb") as fh:
        header = fh.read(8)
    assert header == b"\x89PNG\r\n\x1a\n", (
        "import-your-data.png does not appear to be a valid PNG file."
    )


def test_import_page_images_have_alt_text_for_accessibility():
    """
    Every <img> element in the ImportYourData component source must carry
    a non-empty alt attribute so that screen-readers can describe the image.
    """
    component_path = os.path.join(
        REPO_ROOT, "src", "components", "ImportYourData.tsx"
    )
    assert os.path.isfile(component_path), (
        f"Component not found at {component_path}."
    )

    source = open(component_path).read()

    # Find all <img ... /> tags
    img_tags = re.findall(r"<img\b[^>]*/>", source, flags=re.DOTALL)
    assert img_tags, "No <img> tags found in ImportYourData.tsx."

    for tag in img_tags:
        # Must have alt="..." with a non-empty value
        match = re.search(r'\balt\s*=\s*["\']([^"\']*)["\']', tag)
        assert match is not None, (
            f"<img> tag is missing an alt attribute:\n  {tag}"
        )
        assert match.group(1).strip(), (
            f"<img> tag has an empty alt attribute (use a descriptive string):\n  {tag}"
        )
