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
    echo -e "-d, --database DB \t makes the API use the database you want (DB)"
}

strindex() {
  x="${1%%$2*}"
  [[ "$x" = "$1" ]] && echo -1 || echo "${#x}"
}


function _db() {
    declare -a overwritten_files=()
    declare -a actions=()

    if [[ -e "./.config/db/$1" ]]; then
	for line in $(find "./.config/db/$1" -type f -iname "*.js"| grep -v \~ | grep -v \#); do
	    pos=$(strindex "$line" "$1")
	    if [[ -e ".${line:$pos+${#1}}" ]]; then
		diff=$(diff .${line:$pos+${#1}} $line | wc -l)
		if (( diff > 0 )); then
		    overwritten_files+=(".${line:$pos+${#1}}")
		fi
		actions+=("cp $line .${line:$pos+${#1}}")
	    fi
	done
    else
	echo -e "\e[31mNo configuration for db :\e[39m $1"
	exit 1
    fi

    if [ ${#overwritten_files[@]} -eq 0 ]; then
	echo -e "\e[32mDone !\e[39m (No files has been overwritten)"
    else
	echo -e "\e[33mThe following files will be overwritten : \e[39m"
	printf '%s\n' "${overwritten_files[@]}"
	while true; do
	    echo -e "\n\e[33mAre you sure you want to continue ? [Y/n]  \e[39m"
	    read -p "" choice
	    case "$choice" in
		y|Y ) for action in "${actions[@]}"
		      do
			  eval $action
		      done
		      echo -e "\e[32mDone !\e[39m"
		      break
		      ;;
		n|N ) echo -e "\e[31maborting.\e[39m"
		      break
		      ;;
		* ) echo -e "Invalid choice\n"
		    ;;
	    esac
	done
    fi
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
	    value="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
	    _db ${value}
	    exit 1
	    ;;
    esac
done
