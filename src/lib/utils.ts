export function CalculateNumberOfArtists(cards: any)
{
    let halloween_count: number = 0;
    let card_count: number = 0;

    for (let i = 0; i < cards.length; i++)
    {
        if (cards[i].slug.includes("halloween") && !ArtistInList(cards, cards[i].artist.displayName, cards[i].slug))
        {
            halloween_count++;
        }
        else if (!cards[i].slug.includes("halloween"))
        {
            card_count++;
        }
    }
    card_count /= 2;
    return halloween_count + card_count;
}

function ArtistInList(cards: any, displayName: string, slug: string)
{
    for (let i = 0; i < cards.length; i++)
    {
        if (cards[i].artist.displayName === displayName && cards[i].slug !== slug)
        {
            return true;
        }
    }
    return false;
}