#!/bin/bash
#title          :webp2gif
#description    :convert animated webp to gif
#author         :elsonwx
#date           :20200205
#usage          :webp2gif input.webp output.gif
#==============================================================================
version=0.1
if [[ $1 == "-v" ]];then
    echo "version:$version"
        exit 0
	fi
	cur_dir=$(pwd)
	temp_dir=$(mktemp -d)
	cd $temp_dir
	webpfile=$1
	if [[ ! -f $webpfile ]];then
	    webpfile=$cur_dir/$webpfile
	    fi
	    webpfileinfo="$(webpmux -info $webpfile)"
	    frames_num=$(echo "$webpfileinfo"|sed -n 's/Number of frames: //p')
	    table_line=$(echo "$webpfileinfo"|grep -nh  "No.: width.*"|cut -d : -f 1)
	    duration=0
	    for i in $(seq 1 $frames_num);do
	        webpmux -get frame $i $webpfile -o "$i.webp"
		    width=$(echo "$webpfileinfo"|awk -v cur_line="$((table_line+i))" '{if(NR==cur_line) print $2}')
		        offset_x=$(echo "$webpfileinfo"|awk -v cur_line="$((table_line+i))" '{if(NR==cur_line) print $5}')
			    duration=$(echo "$webpfileinfo"|awk -v cur_line="$((table_line+i))" '{if(NR==cur_line) print $7}')
			        new_width=$((width+offset_x))
				    height=$(echo "$webpfileinfo"|awk -v cur_line="$((table_line+i))" '{if(NR==cur_line) print $3}')
				        offset_y=$(echo "$webpfileinfo"|awk -v cur_line="$((table_line+i))" '{if(NR==cur_line) print $6}')
					    new_height=$((height+offset_y))
					        dwebp "$i.webp" -o "$i.png"
						    convert -gravity southeast -extent ${new_width}x${new_height} -background none "$i.png" "$i.png"
						    done
						    rename 's/(\d+)/sprintf("%03d",$1)/e' *.png
						    echo "converting all png frame file to gif..."
						    duration=$((duration/10))
						    convert -delay $duration -loop 0 *.png animation.gif
						    mv $temp_dir/animation.gif $cur_dir/$2
						    rm -rf $temp_dir
						    echo "finished with success!"
