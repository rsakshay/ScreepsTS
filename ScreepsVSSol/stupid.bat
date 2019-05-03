attrib -h stupid
ren stupid .git
attrib +h .git
call npm run local
attrib -h .git
ren .git stupid
attrib +h stupid
