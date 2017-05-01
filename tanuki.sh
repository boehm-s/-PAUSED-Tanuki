#!/bin/bash

function _help() {
    cat <<EOF
                                       ,------------------------------.
EOF
    echo -e "                                      /   Hi, I'm \e[36mTANUKI\e[39m,              \\"

    cat <<EOF
                        ,,,           \   your API builder assistant ! /
                     .'    \`/\_/\\      | /----------------------------
                   .'       <@I@>      |/
        <((((((((((  )____(  \./
                   \( \(   \(\(
                    \`-"\`-"  " "
EOF

    echo -e "\n\nUsage: ./tanuki.sh [OPTION...]\n"
    echo -e "-?, --help \t\t gives this help list"
    echo -e "-d, --database=DB \t makes the API use the database you want (DB)"
}

function _db() {
    echo  "configuring db $1";
}

optspec=":-:"
while getopts "$optspec" optchar; do
    case "${OPTARG}" in
	help)
	    _help
	    exit 1
	    ;;
	\?)
	_help
	    exit 1
	    ;;
	d)
	    value="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
	    _db ${value}
	    exit 1
	    ;;
	database)
	    echo "hey set up the db ... "
	    exit 1
	    ;;
    esac
done
