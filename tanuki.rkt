#lang racket

(require readline)
(require readline/rep-start)

(define db_list (list "MongoDB" "Neo4J" "PostgreSQL" "MariaDB" "SQLite" "MySQL"))
(define front_list (list "VanillaJS" "React/Redux" "React/Relay" "React/Flux" "AngularJS" "Angular 2" "Angular 4" "Vue.JS"))

(define (list_choice question my_list)
  (define (restart) (printf "\033[2J \033[20A") (list_choice question my_list))

  (printf "~a\n~a ~a"
          question
          (string-join
           (map (lambda (list_item) (format "[~a] -- ~a" (index-of my_list list_item) list_item))
                my_list)
           "\n")
          "\n#> ")
  (match (string->number (read-line))
    [#f (restart)]
    [x (if (list? (member x (range (length my_list)))) (list-ref my_list x) (restart))]
    )
  )

(list_choice "Which DB do you want to use ?" db_list)
