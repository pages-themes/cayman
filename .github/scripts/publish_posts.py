#!/usr/bin/env python3

import os
import frontmatter
import datetime
import pytz
from pathlib import Path

def is_future_post(post_date):
    """Verifica si la fecha del post es en el futuro."""
    now = datetime.datetime.now(pytz.UTC)
    return post_date > now

def is_ready_to_publish(post_date):
    """Verifica si el post está listo para ser publicado."""
    now = datetime.datetime.now(pytz.UTC)
    return post_date <= now

def process_posts():
    """Procesa los posts programados y los publica cuando corresponde."""
    posts_dir = Path('_posts')
    drafts_dir = Path('_drafts')
    
    # Asegurarse de que exista el directorio de drafts
    drafts_dir.mkdir(exist_ok=True)
    
    # Procesar posts existentes
    for post_file in posts_dir.glob('*.md'):
        post = frontmatter.load(post_file)
        
        # Verificar si el post tiene fecha
        if 'date' not in post.metadata:
            continue
            
        post_date = post.metadata['date']
        if isinstance(post_date, str):
            try:
                post_date = datetime.datetime.strptime(post_date, '%Y-%m-%d')
                post_date = pytz.UTC.localize(post_date)
            except ValueError:
                continue
        
        # Si el post es para el futuro, moverlo a drafts
        if is_future_post(post_date):
            draft_path = drafts_dir / post_file.name
            post_file.rename(draft_path)
            print(f"Moved future post to drafts: {post_file.name}")
    
    # Procesar drafts
    for draft_file in drafts_dir.glob('*.md'):
        post = frontmatter.load(draft_file)
        
        # Verificar si el draft tiene fecha
        if 'date' not in post.metadata:
            continue
            
        post_date = post.metadata['date']
        if isinstance(post_date, str):
            try:
                post_date = datetime.datetime.strptime(post_date, '%Y-%m-%d')
                post_date = pytz.UTC.localize(post_date)
            except ValueError:
                continue
        
        # Si es tiempo de publicar, mover a posts
        if is_ready_to_publish(post_date):
            post_path = posts_dir / draft_file.name
            draft_file.rename(post_path)
            print(f"Published post: {draft_file.name}")

def main():
    """Función principal."""
    try:
        process_posts()
    except Exception as e:
        print(f"Error processing posts: {str(e)}")
        raise

if __name__ == '__main__':
    main()