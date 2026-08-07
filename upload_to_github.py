import os
import sys
import base64
import requests

GITHUB_REPO = "saishivayadav00-boop/farmer"
BRANCH = "main"

IGNORED_DIRS = {'.git', '__pycache__', 'node_modules', 'dist', 'build', '.vscode', '.idea', 'env', 'venv'}
IGNORED_EXTENSIONS = {'.pyc', '.pyo', '.db', '.sqlite', '.sqlite3', '.log'}

def get_all_files(root_dir):
    file_paths = []
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in IGNORED_EXTENSIONS:
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, root_dir).replace('\\', '/')
            file_paths.append((full_path, rel_path))
    return file_paths

def upload_file_to_github(token, full_path, rel_path):
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{rel_path}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    # Always fetch latest sha immediately before PUT request
    sha = None
    try:
        get_res = requests.get(url, headers=headers)
        if get_res.status_code == 200:
            sha = get_res.json().get('sha')
    except Exception:
        pass

    with open(full_path, 'rb') as file_obj:
        content_b64 = base64.b64encode(file_obj.read()).decode('utf-8')

    payload = {
        "message": f"Upload {rel_path} - AgriConnect full-stack update",
        "content": content_b64,
        "branch": BRANCH
    }
    if sha:
        payload["sha"] = sha

    put_res = requests.put(url, headers=headers, json=payload)
    if put_res.status_code in (200, 201):
        print(f"[OK] Uploaded: {rel_path}")
    else:
        print(f"[FAIL] ({put_res.status_code}): {rel_path} -> {put_res.text}")

def main():
    if len(sys.argv) > 1:
        token = sys.argv[1].strip()
    else:
        token = input("Enter your GitHub Personal Access Token (PAT): ").strip()

    if not token:
        print("[ERROR] GitHub Token is required.")
        return

    files = get_all_files(os.getcwd())
    print(f"\n[INFO] Found {len(files)} project files. Uploading to https://github.com/{GITHUB_REPO}...\n")

    for full_path, rel_path in files:
        upload_file_to_github(token, full_path, rel_path)

    print("\n[SUCCESS] All files uploaded! View repository at https://github.com/" + GITHUB_REPO)

if __name__ == '__main__':
    main()
