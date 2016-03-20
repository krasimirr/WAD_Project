from django.contrib import admin
from health_search_application.models import Category, Page, Contact

# display the category's name
class showCategory(admin.ModelAdmin):
    list_display = ('name')

# display the Page's fields
class showPage(admin.ModelAdmin):
    list_display = ('category', 'title', 'url', 'readingRating', 'sentimentRating')

# display the contact's fields + a button for replying to the received message
class contact_admin(admin.ModelAdmin):
    list_display = ('contact_name', 'contact_email', 'is_answered', 'received', 'send_emails')

    def send_emails(self, obj):
        return '''
            <script>
                function getId(element) {
                    var rowNumber=element.parentNode.parentNode.rowIndex;
                    var rowContent = document.getElementById("result_list").rows[rowNumber].cells;
                    var email=rowContent[2].innerHTML;
                    
                    var left = (screen.width/2)-(400/2);
                    var top = (screen.height/2)-(460/2);
                    
                    popupWindow = window.open(
	'/searchapp/send_email/', 'Send email', 'height=460,width=450, resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes, top='+top+', left='+left);

                    popupWindow.onload = function() {popupWindow.document.getElementById("re_user").value=email}
                }
                

            </script>
            <button onclick="getId(this)">Send email</button>
'''
    send_emails.allow_tags = True

admin.site.register(Contact, contact_admin)
admin.site.register(Category)
admin.site.register(Page, showPage)
