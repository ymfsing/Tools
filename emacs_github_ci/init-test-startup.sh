#!/bin/sh -e
echo "Attempting startup..."
${EMACS:=emacs} -nw --batch \
                --eval '(let ((debug-on-error t)
                              (url-show-status nil)
                              (user-emacs-directory default-directory)
                              (user-init-file (expand-file-name "init.el"))
                              (load-path (delq default-directory load-path)))
                        (load-file user-init-file)
                        (run-hooks (quote after-init-hook))
                        (run-hooks (quote emacs-startup-hook))
                        (run-hooks (quote window-setup-hook)))'
echo "Startup successful"
