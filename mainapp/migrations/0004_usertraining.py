# Generated by Django 5.1.2 on 2024-12-07 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_customuser_groups_customuser_user_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserTraining',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('json_field', models.JSONField()),
            ],
        ),
    ]
