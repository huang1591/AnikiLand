Frontend Reviews
1.
The surge URL

    https://yw68-hw6.surge.sh

Detailed comments on what you like about the frontend:

    main page has a background image, which looks nice.

What features of the frontend appear to not function properly:

    can add the user himself as a friend

What features seem to be missing from the frontend

    new posts are not persistent

What functionality in the frontend was difficult or non-intuitive to use

    No

Overall user experience score from 1 to 10 with 10 being the highest score

    7/10


2.
The surge URL

    http://ricebookofchen.surge.sh

Detailed comments on what you like about the frontend:

    CSS style looks very nice

What features of the frontend appear to not function properly:

    No

What features seem to be missing from the frontend

    No

What functionality in the frontend was difficult or non-intuitive to use

    New post area is in the bottom of the page

Overall user experience score from 1 to 10 with 10 being the highest score

    9/10

3.
The surge URL

    http://ricebook-yro.surge.sh  

Detailed comments on what you like about the frontend:

    CSS style looks very nice

What features of the frontend appear to not function properly:

    No

What features seem to be missing from the frontend

    Cannot post pure text article

What functionality in the frontend was difficult or non-intuitive to use

    No

Overall user experience score from 1 to 10 with 10 being the highest score

    8/10


4.
The surge URL

    http://loving-fiction.surge.sh  

Detailed comments on what you like about the frontend:

    Coloring looks very nice

What features of the frontend appear to not function properly:

    No

What features seem to be missing from the frontend

    No

What functionality in the frontend was difficult or non-intuitive to use

    New post and followers are in the bottom of the page

Overall user experience score from 1 to 10 with 10 being the highest score

    7/10


5.
The surge URL

    http://fakebookhw6.surge.sh/#/   

Detailed comments on what you like about the frontend:

    CSS style looks very nice

What features of the frontend appear to not function properly:

    add friends is not persistent, cannot search post properly

What features seem to be missing from the frontend

    No

What functionality in the frontend was difficult or non-intuitive to use

    router links are small

Overall user experience score from 1 to 10 with 10 being the highest score

    6/10




API Design Decisions:

    For users, I use username for identifier. When they register, I will
check if there is a same username in the database, the users cannot register
if there is. So the usernames are unique.
    For articles, I use id assigned by MongoDB, it is unique guaranteed by
MongoDB.
