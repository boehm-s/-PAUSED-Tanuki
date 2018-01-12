#lang racket

(require readline)
(require readline/rep-start)
(require racket/cmdline)

(command-line
 #:multi [("-cm" "--check-middlewares")    "Check if middlewares files contains only middlewares"      check_middlewares]

 )

(define (check_middlewares)
  (define middleware_files
    (filter
     (lambda(el) (string-suffix? (path->string el) ".js"))
     (directory-list "API/middlewares" #:build? #t) ))

  (define middleware_per_file
    (map
     (lambda(file_path)
       (define in (open-input-file file_path))
       (read-line in)
       (close-input-port in)
       )
     middleware_files))
  )



;; (define db_list (list "MongoDB" "Neo4J" "PostgreSQL" "MariaDB" "SQLite" "MySQL"))
;; (define front_list (list "VanillaJS" "React/Redux" "React/Relay" "React/Flux" "AngularJS" "Angular 2" "Angular 4" "Vue.JS"))

;; (define (list_choice question my_list)
;;   (define (restart) (printf "\033[2J \033[20A") (list_choice question my_list))

;;   (printf "~a\n~a ~a"
;;           question
;;           (string-join
;;            (map (lambda (list_item) (format "[~a] -- ~a" (index-of my_list list_item) list_item))
;;                 my_list)
;;            "\n")
;;           "\n#> ")
;;   (match (string->number (read-line))
;;     [#f (restart)]
;;     [x (if (list? (member x (range (length my_list)))) (list-ref my_list x) (restart))]
;;     )
;;   )

;; (define db (list_choice "Which DB do you want to use ?" db_list))
;; (define front (list_choice "Which Front-End technology do you want to use ?" front_list))



;; make simple vanilla git module, and do the copy
;; also choose a git lib for racket or do one or just use http calls ?
