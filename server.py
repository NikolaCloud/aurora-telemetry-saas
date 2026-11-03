#!/usr/bin/env python3
"""
Aurora Telemetry - SaaS Landing Page Web Server
Standard Python 3 compatible (zero mandatory external dependencies).
"""

import http.server
import socketserver
import os
import sys

PORT = 8003
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stderr.write(f"[AuroraSaaS] {self.address_string()} - {format%args}\n")

def run_server():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
        print("=" * 60)
        print(" Aurora Telemetry // AI Observability SaaS Landing")
        print(f" Server running at: http://127.0.0.1:{PORT}")
        print(" Press Ctrl+C to stop.")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully...")

if __name__ == "__main__":
    run_server()
